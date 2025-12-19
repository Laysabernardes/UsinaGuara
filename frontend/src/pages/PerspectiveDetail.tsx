import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PerspectiveService } from '../features/perpectives/components/perspective.service';
import type { PerspectiveResponseType } from '../features/perpectives/components/FormPerspective/perspective.types';
import { PerspectiveDetailView } from '../features/perpectives/components/PerspectiveDetailView';
import LoadingOverlay from '../components/LoadingOverlay';

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
      setError("Slug not found in URL.");
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
          throw new Error("Perspective not found.");
        }
      } catch (err) {
        setError("Could not load perspective data. Please check API connection.");
        setIsLoading(false);
      }
    }
    loadInitialPerspective();
  }, [slug]);

  useEffect(() => {
    if (!perspective) return;

    async function loadOtherPerspectives() {
      try {
        const projectId = perspective?.project?._id;
        if (!projectId) {
          console.error("projectId not found in perspective.");
          return;
        }
        const otherData = await PerspectiveService.getByProjectId(projectId);
        setOtherPerspectives(otherData.sort((a, b) => a.order - b.order));
      } catch (err) {
        console.error("Falha ao carregar outras perspectivas:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadOtherPerspectives();
  }, [perspective]);

  if (isLoading) {
    return <LoadingOverlay />;
  }
  if (error) {
    return (
      <div className="flex items-center justify-center p-20 text-red-500 bg-gray-900 h-screen text-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  if (!perspective) return <div className="text-center p-20 text-white bg-gray-900 h-screen">Perspectiva não encontrada.</div>;

  return <PerspectiveDetailView perspective={perspective} otherPerspectives={otherPerspectives} />;
}