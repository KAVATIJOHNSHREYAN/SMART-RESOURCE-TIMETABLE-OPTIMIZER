import random
import numpy as np
from deap import base, creator, tools, algorithms
from typing import List, Dict, Any
from .constraints import ConstraintEngine

class TimetableOptimizer:
    def __init__(self, requirements: List[Dict], time_slots: List[int], rooms: List[int], faculty: List[int]):
        """
        requirements: List of dicts representing classes that MUST be scheduled. e.g. {"section_id": 1, "subject_id": 101}
        time_slots: List of available time_slot IDs.
        rooms: List of available room IDs.
        faculty: List of available faculty IDs for the subjects (simplified, assumed all can teach).
        """
        self.requirements = requirements
        self.time_slots = time_slots
        self.rooms = rooms
        self.faculty = faculty
        
        self.num_classes = len(self.requirements)
        
        # Define DEAP fitness and individual
        if hasattr(creator, "FitnessMax"):
            del creator.FitnessMax
        if hasattr(creator, "Individual"):
            del creator.Individual
            
        # We want to MAXIMIZE fitness (0 hard conflicts, max soft constraint satisfaction)
        creator.create("FitnessMax", base.Fitness, weights=(1.0,))
        creator.create("Individual", list, fitness=creator.FitnessMax)

        self.toolbox = base.Toolbox()
        
        # Attribute generator: (time_slot, room, faculty)
        self.toolbox.register("attr_time", random.choice, self.time_slots)
        self.toolbox.register("attr_room", random.choice, self.rooms)
        self.toolbox.register("attr_faculty", random.choice, self.faculty)
        
        # Structure initializers
        # An individual is a list of triplets, one for each requirement
        self.toolbox.register("individual", tools.initCycle, creator.Individual,
                              (self.toolbox.attr_time, self.toolbox.attr_room, self.toolbox.attr_faculty), n=self.num_classes)
        self.toolbox.register("population", tools.initRepeat, list, self.toolbox.individual)

        # Genetic Operators
        self.toolbox.register("evaluate", self.eval_timetable)
        self.toolbox.register("mate", tools.cxTwoPoint)
        self.toolbox.register("mutate", self.mutate_individual, indpb=0.1)
        self.toolbox.register("select", tools.selTournament, tournsize=3)

    def decode_individual(self, individual) -> List[Dict]:
        entries = []
        for i in range(self.num_classes):
            req = self.requirements[i]
            # individual is flat: [t1, r1, f1, t2, r2, f2, ...]
            t_idx = i * 3
            time_slot = individual[t_idx]
            room = individual[t_idx + 1]
            fac = individual[t_idx + 2]
            
            entries.append({
                "section_id": req["section_id"],
                "subject_id": req["subject_id"],
                "time_slot_id": time_slot,
                "room_id": room,
                "faculty_id": fac
            })
        return entries

    def eval_timetable(self, individual):
        entries = self.decode_individual(individual)
        engine = ConstraintEngine(entries)
        conflicts = engine.evaluate()
        
        # Base score
        score = 1000.0
        
        # Penalty for conflicts
        hard_conflicts = sum(1 for c in conflicts if c['severity'] == 'HARD')
        score -= (hard_conflicts * 200) # Heavy penalty for hard conflicts
        
        # Add slight randomness/soft constraints in a full implementation
        return (max(0.1, score),) # Fitness must be tuple

    def mutate_individual(self, individual, indpb):
        for i in range(self.num_classes):
            if random.random() < indpb:
                t_idx = i * 3
                # Randomly mutate one of the genes for this class
                mutation_type = random.choice([0, 1, 2])
                if mutation_type == 0:
                    individual[t_idx] = random.choice(self.time_slots)
                elif mutation_type == 1:
                    individual[t_idx + 1] = random.choice(self.rooms)
                else:
                    individual[t_idx + 2] = random.choice(self.faculty)
        return individual,

    def run(self, ngen=50, pop_size=100) -> List[Dict]:
        pop = self.toolbox.population(n=pop_size)
        hof = tools.HallOfFame(1) # Store best individual
        
        stats = tools.Statistics(lambda ind: ind.fitness.values)
        stats.register("avg", np.mean)
        stats.register("min", np.min)
        stats.register("max", np.max)

        # Run the GA
        algorithms.eaSimple(pop, self.toolbox, cxpb=0.5, mutpb=0.2, ngen=ngen, stats=stats, halloffame=hof, verbose=False)
        
        best_ind = hof[0]
        return self.decode_individual(best_ind)
