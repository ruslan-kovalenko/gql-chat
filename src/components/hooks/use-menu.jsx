import { useState, useCallback, useMemo } from 'react';

const useMenu = () => {
  const [menuAnchor, setMenuAnchor] = useState();
  const isMenuOpened = !!menuAnchor;
  const onMenuOpen = useCallback(({ currentTarget }) => setMenuAnchor(currentTarget), []);
  const onMenuClose = useCallback(() => setMenuAnchor(null), []);
  const providedValue = useMemo(
    () => ({ onMenuOpen, onMenuClose, isMenuOpened, menuAnchor }),
    [onMenuOpen, onMenuClose, isMenuOpened, menuAnchor]
  );

  return providedValue;
};

export default useMenu;
