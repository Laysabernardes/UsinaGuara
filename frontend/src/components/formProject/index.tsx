import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TypeInput,
  Textarea,
  Selection,
  MultiSelect,
} from "../../components/inputs";
import { FaGear } from "react-icons/fa6";
import { ProjectService } from "../../features/projects/project.service";
import { PeopleService } from "../../service/people.service";
import { CarouselService } from "../../service/carousel.service";
import type ProjectRequest from "../../dto/request/projectRequest";
import type ProjectResponse from "../../dto/response/projectResponse";
import type PeopleResponse from "../../dto/response/peopleResponse";

const FormProjectData = z.object({
  _id: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  slug: z.string(),
  about_html: z.string().optional(),
  team: z.array(z.string()).optional(),
  status: z.string(),
  isCarousel: z
    .union([z.string(), z.boolean()])
    .transform((val) => val === true || val === "true"),
  orderCarousel: z.coerce.number().optional(),
  banner: z.string().optional(),
  extraURL: z.string().optional(),
});

export function FormProject({
  token,
  action,
  setFeedback,
}: {
  token: string;
  action: string;
  setFeedback: (feedback: {
    type: "success" | "error";
    message: string;
  }) => void;
}) {
  const { register, setValue, watch, reset, getValues } = useForm({
    resolver: zodResolver(FormProjectData),
    defaultValues: {
      isCarousel: false,
      status: "draft",
    },
  });

  const [projectId, setProjectId] = useState<string | null>(null);
  const [allProjects, setAllProjects] = useState<ProjectResponse[]>();
  const [allPeople, setAllPeople] = useState<PeopleResponse[]>();
  const [carouselOptions, setCarouselOptions] = useState<
    { id: string | number; text: string }[]
  >([]);

  //Endpoint pra pegar pessoas
  const getAllPeople = async () => {
    try {
      const response = await PeopleService.getAllPeople(token);
      setAllPeople(response);
    } catch (e) {
      console.log(e);
    }
  };

  // Endpoint Pegar Projetos
  const getAllProjects = async () => {
    try {
      const response = await ProjectService.getAllProjects(token);
      setAllProjects(response);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSelectProject = () => {
    const project: ProjectRequest = allProjects?.find(
      (p: ProjectResponse) => p._id === projectId
    )!;
    if (!project) return;
    setValue("_id", project._id);
    setValue("title", project.title);
    setValue("subtitle", project.subtitle);
    setValue("slug", project.slug);
    setValue("about_html", project.about_html);
    setValue("team", project.team);
    setValue("status", project.status);
    setValue("isCarousel", project.isCarousel);
    setValue("orderCarousel", project.orderCarousel);
    setValue("banner", project.banner);
    setValue("extraURL", project.extraURL);

    if (project.isCarousel) {
      getCarouselOrder(project.orderCarousel);
    }
  };

  const resolveIds = (data: any[], text: string) => {
    return data.map((d) => ({
      id: d._id,
      text: d[text],
    }));
  };

  const getCarouselOrder = async (currentOrder?: number) => {
    try {
      const carouselNumbers = await CarouselService.getAllCarouselOrder();

      const usedOrders = carouselNumbers
        .map((item) => item.orderCarousel)
        .filter((n): n is number => n !== undefined);

      const options = Array.from({ length: 10 }, (_, i) => i + 1)
        .filter((n) => !usedOrders.includes(n) || n === currentOrder) // garante que o atual entre
        .map((n) => ({
          id: n,
          text: `${n}°`,
        }));

      setCarouselOptions(options);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmitProjectForm = async () => {
    const data = getValues();
    const projectData: ProjectRequest = {
      title: data.title,
      subtitle: data.subtitle,
      slug: data.slug,
      about_html: data.about_html,
      team: data.team,
      status: data.status,
      isCarousel: data.isCarousel === true || data.isCarousel === "true",
      orderCarousel: data.orderCarousel
        ? Number(data.orderCarousel)
        : undefined,
      banner: data.banner,
      extraURL: data.extraURL,
    };

    try {
      if (action === "Create") {
        await ProjectService.createProject(token, projectData);
        setFeedback({
          type: "success",
          message: "Projeto criado com sucesso!",
        });
        getAllProjects();
        reset();
      } else if (action === "Update" && projectId != "-") {
        await ProjectService.updateProject(token, projectData, data._id);
        setFeedback({
          type: "success",
          message: "Projeto atualizado com sucesso!",
        });
        getAllProjects();
        reset();
      } else if (action === "Delete" && projectId != "-") {
        await ProjectService.deleteProject(token, data._id);
        setFeedback({
          type: "success",
          message: "Projeto deletado com sucesso!",
        });
        getAllProjects();
        reset();
      } else {
        setFeedback({ type: "error", message: "Erro: Ação desconhecida." });
      }
    } catch (e: any) {
      console.log(e);
      setFeedback({
        type: "error",
        message:
          "Erro ao executar a ação no projeto: " + e.response.data.message,
      });
    }
  };

  // Ao selecionar um projeto
  useEffect(() => {
    if (projectId) {
      handleSelectProject();
    }
  }, [projectId]);

  // Ao trocar orderCarousel
  useEffect(() => {
    if (!watch("isCarousel")) {
      setValue("orderCarousel", undefined);
    }
  }, [watch("isCarousel"), setValue]);

  // Ao trocar action
  useEffect(() => {
    setProjectId(null);
    reset();
  }, [action]);

  //OnInit
  useEffect(() => {
    try {
      getAllProjects();
    } catch (e) {
      setFeedback({
        type: "error",
        message: "Erro ao buscar projetos",
      });
    }
    try {
      getAllPeople();
    } catch (e) {
      setFeedback({
        type: "error",
        message: "Erro ao buscar pessoas",
      });
    }
    try {
      getCarouselOrder();
    } catch (e) {
      setFeedback({
        type: "error",
        message: "Erro ao buscar CarouselOrder",
      });
    }
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitProjectForm();
      }}
    >
      {(action === "Update" || action === "Delete") && allProjects && (
        <Selection
          id="id"
          title="Selecione um Projeto"
          placeholder="-"
          icon={<FaGear />}
          options={resolveIds(allProjects, "title")}
          onChange={(e) => setProjectId(e.target.value)}
          value={projectId ?? "-"}
          required={true}
        />
      )}
      {(action === "Create" || (action === "Update" && projectId)) && (
        <>
          <TypeInput
            id="title"
            title="Título Projeto"
            type="text"
            placeholder="Digite o título"
            icon={<FaGear />}
            required={true}
            {...register("title")}
          />
          <TypeInput
            id="subtitle"
            title="Subtítulo Projeto"
            type="text"
            placeholder="Digite o subtítulo"
            icon={<FaGear />}
            required={false}
            {...register("subtitle")}
          />
          <TypeInput
            id="slug"
            title="Nome para URL"
            type="text"
            placeholder="Digite um nome para URL"
            icon={<FaGear />}
            required={true}
            {...register("slug")}
          />
          <TypeInput
            id="banner"
            title="Banner"
            type="text"
            placeholder="Cole um link"
            icon={<FaGear />}
            required={false}
            {...register("banner")}
          />
          <MultiSelect
            id="team"
            name="team"
            title="Integrantes"
            placeholder="Selecione os integrantes"
            icon={<FaGear />}
            options={resolveIds(allPeople!, "name")}
            required
            value={watch("team")}
            setValue={(value) => setValue("team", value)}
          />
          <Selection
            id="isCarousel"
            title="Exibir Carousel?"
            icon={<FaGear />}
            nullOption={false}
            options={[
              { id: "false", text: "Não" },
              { id: "true", text: "Sim" },
            ]}
            required={false}
            onChange={(e) => setValue("isCarousel", e.target.value === "true")}
            value={watch("isCarousel") ? "true" : "false"}
          />
          {watch("isCarousel") && (
            <>
              <Selection
                id="orderCarousel"
                title="Ordem de aparição"
                placeholder="-"
                icon={<FaGear />}
                options={carouselOptions}
                required={true}
                value={watch("orderCarousel")?.toString() ?? ""}
                onChange={(e) =>
                  setValue("orderCarousel", Number(e.target.value))
                }
              />
              <TypeInput
                id="extraURL"
                title="URL Extra Carousel"
                type="text"
                placeholder="Cole um link"
                icon={<FaGear />}
                required={false}
                {...register("extraURL")}
              />
            </>
          )}
          <Selection
            id="status"
            title="Status"
            icon={<FaGear />}
            nullOption={false}
            options={[
              { id: "draft", text: "Rascunho" },
              { id: "published", text: "Público" },
            ]}
            {...register("status")}
            required={true}
          />
          <Textarea
            id="about_html"
            title="Sobre o Projeto"
            placeholder="Digite o conteúdo"
            required={false}
            {...register("about_html")}
          />
        </>
      )}
      {action != "-" && (
        <button
          type="submit"
          className="w-full bg-red-2 text-1xl font-bold text-white text-center rounded-lg p-2 py-3 my-5 cursor-pointer transition hover:bg-red-1"
        >
          Submeter
        </button>
      )}
    </form>
  );
}
