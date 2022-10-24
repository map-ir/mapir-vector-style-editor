import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';

import { selectedLayerIDState, styleObjState } from 'atoms/map';

import type { Layer } from 'mapbox-gl';

const useGetSelectedLayer = () => {
  const openLayerID = useAtomValue(selectedLayerIDState);
  const styleObj = useAtomValue(styleObjState);

  const [layer, setLayer] = useState<Layer | undefined>(undefined);

  useEffect(() => {
    if (openLayerID)
      setLayer({
        ...styleObj?.layers?.find((l) => l.id === openLayerID),
      } as Layer);
    else setLayer(undefined);
  }, [openLayerID, styleObj]);

  return { layer };
};

export default useGetSelectedLayer;
