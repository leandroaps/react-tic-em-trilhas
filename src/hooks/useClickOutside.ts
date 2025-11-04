import { useEffect, type RefObject } from 'react';

interface useOnClickOutsideProps {
  ref: RefObject<HTMLUListElement | null>;
  handle: (params: unknown) => void;
}

const useOnClickOutside = ({ ref, handle }: useOnClickOutsideProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handle(event);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [handle, ref]);
};

export default useOnClickOutside;
