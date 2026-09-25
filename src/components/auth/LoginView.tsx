import React, { useState } from 'react';
import { ArrowRight, Lock, User, Shield } from 'lucide-react';
import { authService } from '../../services/auth';
import { useToast } from '../ui/Toast';

interface LoginViewProps {
  onNavigate: (route: string) => void;
  onSuccess: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onNavigate, onSuccess }) => {
  const { showToast } = useToast();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.login(username, password);
      showToast('Signed in successfully.', 'success');
      onSuccess();
    } catch {
      showToast('Authentication failed.', 'warning');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Angular Logo Motif */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-10 w-10 items-center justify-center mb-2">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <polygon points="12,2 22,20 2,20" stroke="#8052ff" strokeWidth="2" fill="none" />
              <polygon points="12,7 19,19 5,19" fill="#8052ff" fillOpacity="0.3" />
              <circle cx="12" cy="13" r="2" fill="#15846e" />
            </svg>
          </div>
          <h1 className="text-3xl font-normal tracking-[-0.03em] text-white">
            Operator sign in
          </h1>
          <p className="text-xs text-[#9a9a9a]">
            Connect to Customer Support Intelligence & Resolution platform.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#9a9a9a]">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#222222] rounded-full py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#8052ff]"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono uppercase tracking-wider text-[#9a9a9a]">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#222222] rounded-full py-2.5 px-4 text-xs text-white focus:outline-none focus:border-[#8052ff]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#8052ff] hover:bg-[#7042ee] text-white text-xs font-normal transition-colors"
          >
            <span>{loading ? 'Authenticating...' : 'Sign in'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <div className="text-center text-xs text-[#9a9a9a] space-y-2">
          <p>
            FastAPI JWT endpoints ready: <span className="font-mono text-[11px] text-[#bdbdbd]">POST /auth/login</span>
          </p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-[#8052ff] hover:underline"
          >
            Enter as guest operator →
          </button>
        </div>
      </div>
    </div>
  );
};
