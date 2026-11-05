'use client';

import { useCallback, useEffect, useState } from 'react';
import { useArmoyu, Station } from '@armoyu/ui';

/** İstasyonu adresinden yükler; bulunamazsa notFound true olur */
export function useStation(slug: string) {
  const { ui } = useArmoyu();
  const [station, setStation] = useState<Station | null>(null);
  const [canManage, setCanManage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const reload = useCallback(async () => {
    // shortcut: yayınlanan @armoyu/core tiplerinde getStation yok; yeni sürüm çıkınca cast kalkacak
    const response = await (ui.api.stations as any).getStation(slug);
    if (response.durum === 1 && response.icerik) {
      setStation(Station.fromAPI(response.icerik));
      setCanManage(!!response.icerik.canManage);
    } else {
      setNotFound(true);
    }
    setIsLoading(false);
  }, [ui.api.stations, slug]);

  useEffect(() => { reload(); }, [reload]);

  return { station, setStation, canManage, isLoading, notFound, reload };
}
