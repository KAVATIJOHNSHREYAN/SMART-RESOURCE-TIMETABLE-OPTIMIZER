'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Layers, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl space-y-8"
      >
        <div className="mx-auto bg-primary/10 w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-sm border border-primary/20">
          <Calendar className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground">
          Smart Resource & <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-blue-500">
            Timetable Optimizer
          </span>
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Enterprise-grade AI-powered resource allocation and timetable generation using Computational Intelligence. Say goodbye to scheduling conflicts.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            href="/admin/departments" 
            className="btn-gradient px-8 py-3 rounded-full font-semibold text-base flex items-center gap-2 w-full sm:w-auto"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 pt-16">
          {[
            { icon: Layers, title: 'Master Data', desc: 'Manage departments, faculty, and rooms seamlessly.' },
            { icon: Zap, title: 'AI Engine', desc: 'Genetic algorithms optimize your schedule in seconds.' },
            { icon: Calendar, title: 'Conflict-Free', desc: 'Hard and soft constraint validation built-in.' }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (i * 0.1) }}
              className="bg-card p-6 rounded-2xl border shadow-sm flex flex-col items-center text-center space-y-3"
            >
              <div className="p-3 bg-muted rounded-full">
                <feature.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
