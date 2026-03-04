import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export function useModRole() {
  const { user } = useAuth();
  const [hasRole, setHasRole] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) { setHasRole(false); setIsAdmin(false); return; }
    supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .then(({ data }) => {
        if (data && data.length > 0) {
          setHasRole(true);
          setIsAdmin(data.some((r: any) => r.role === 'admin'));
        }
      });
  }, [user]);

  return { hasRole, isAdmin };
}
