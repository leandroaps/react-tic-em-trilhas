import { memo } from 'react';

function List({ children, onClick, ...props }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <li onClick={onClick} {...props} className="items-center justify-between p-2 hover:bg-gray-100 flex">
      {children}
    </li>
  );
}

export default memo(List);
