import { Search, Bell, User } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

export function TopBar() {
  const { user } = useAuthStore();

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-8 pr-0 bg-transparent text-foreground placeholder:text-muted-foreground focus:ring-0 sm:text-sm"
            placeholder="Global search (Students, Faculty, Subjects)..."
            type="search"
            name="search"
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button type="button" className="-m-2.5 p-2.5 text-muted-foreground hover:text-foreground relative">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" aria-hidden="true" />

          {/* Profile dropdown */}
          <div className="relative group">
            <button className="-m-1.5 flex items-center p-1.5 focus:outline-none">
              <span className="sr-only">Open user menu</span>
              <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                 <User className="w-5 h-5 text-primary" />
              </div>
              <span className="hidden lg:flex lg:flex-col lg:items-start lg:ml-3">
                <span className="text-sm font-semibold leading-none text-foreground" aria-hidden="true">
                  {user?.full_name || 'Admin User'}
                </span>
                <span className="text-xs text-muted-foreground mt-1 capitalize leading-none">
                  {user?.role?.toLowerCase() || 'Admin'}
                </span>
              </span>
            </button>
            
            {/* Dropdown Menu (Hover based for simplicity) */}
            <div className="absolute right-0 top-full mt-1 w-48 rounded-xl bg-card border shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <button 
                onClick={() => {
                  useAuthStore.getState().logout();
                  window.location.href = '/login';
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-muted font-medium"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
