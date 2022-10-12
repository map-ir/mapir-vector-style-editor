import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';

import { selectedLayerIDState, styleObjState } from 'atoms/map';

import type { AnyLayer } from 'mapbox-gl';

const useGetSelectedLayer = () => {
  const openLayerID = useAtomValue(selectedLayerIDState);
  const styleObj = useAtomValue(styleObjState);

  const [layer, setLayer] = useState<AnyLayer | undefined>(undefined);

  useEffect(() => {
    if (openLayerID)
      setLayer(styleObj?.layers?.find((l) => l.id === openLayerID));
  }, [openLayerID, styleObj]);

  return { layer };
};

export default useGetSelectedLayer;
