import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PerspectiveService } from '../features/perpectives/components/perspective.service';
import type { PerspectiveResponseType } from '../features/perpectives/components/FormPerspective/perspective.types';
import { PerspectiveDetailView } from '../features/perpectives/components/PerspectiveDetailView';

export default function PerspectiveDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [perspective, setPerspective] = useState<PerspectiveResponseType | null>(null);
  const [otherPerspectives, setOtherPerspectives] = useState<PerspectiveResponseType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!slug) {
      setIsLoading(false);
      setError("Slug não encontrado na URL.");
      return;
    };

    async function loadInitialPerspective() {
      setIsLoading(true);
      setError(null);
      setPerspective(null); 
      setOtherPerspectives([]); 

      try {
        const perspectiveData = await PerspectiveService.getBySlug(slug as string);
        if (perspectiveData) {
          setPerspective(perspectiveData);
        } else {
          throw new Error("Perspectiva não encontrada.");
        }
      } catch (err) {
        setError("Não foi possível carregar a perspectiva.");
        console.error(`Falha ao carregar dados para ${slug}`, err);
        setIsLoading(false);
      }
    }
    loadInitialPerspective();
  }, [slug]); 

  useEffect(() => {
    if (!perspective) return;

    async function loadOtherPerspectives() {
      try {
        const projectId = perspective?.projectId?._id;
        if (!projectId) {
          console.error("projectId não encontrado na perspectiva.");
          return;
        }
        const otherData = await PerspectiveService.getByProjectId(projectId);
        console.log("OUTRAS PERSPECTIVAS RECEBIDAS:", otherData);
        setOtherPerspectives(otherData.sort((a, b) => a.order - b.order));
      } catch (err) {
        console.error("Falha ao carregar outras perspectivas:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadOtherPerspectives();
  }, [perspective]); 

  if (isLoading) return <div className="text-center p-20 text-white bg-gray-900 h-screen">Carregando...</div>;
  if (error) return <div className="text-center p-20 text-red-500 bg-gray-900 h-screen">{error}</div>;

  if (!perspective) return <div className="text-center p-20 text-white bg-gray-900 h-screen">Perspectiva não encontrada.</div>;

  return <PerspectiveDetailView perspective={perspective} otherPerspectives={otherPerspectives} />;
}