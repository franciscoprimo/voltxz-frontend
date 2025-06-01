import { Card, CardContent } from "@/components/ui/card";

interface Project {
  id: string;
  title: string;
  location: string;
  capacity: number;
  status: string;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="border-yellow-300">
      <CardContent className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{project.title}</h2>
        <p className="text-sm text-gray-600">{project.location}</p>
        <p className="text-sm text-gray-600">
          Capacidade: {project.capacity} kWp
        </p>
        <p className="text-sm">
          Status:{" "}
          <span
            className={`font-medium ${
              project.status === "em execução"
                ? "text-green-600"
                : project.status === "em captação"
                ? "text-yellow-600"
                : "text-gray-500"
            }`}
          >
            {project.status}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
