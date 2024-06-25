// hooks/useStores
import { useContext } from 'react';
import { MobXProviderContext } from 'mobx-react-lite';

export const useStores = () => {
  return useContext(MobXProviderContext);
};
