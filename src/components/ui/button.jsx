
export function Button({ children, onClick, variant = 'default', size = 'md' }) {
  const base = 'rounded px-4 py-2 font-medium transition';
  const variants = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-700',
    outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50',
  };
  const sizes = {
    sm: 'text-sm py-1 px-3',
    md: 'text-base',
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${sizes[size]}`}>
      {children}
    </button>
  );
}
