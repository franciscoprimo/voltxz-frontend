import { Card, CardContent } from "@/components/ui/card";

interface Land {
  id: string;
  name: string;
  location: string;
  size: number;
  status: string;
}

export function LandCard({ land }: { land: Land }) {
  return (
    <Card className="border-yellow-300">
      <CardContent className="p-4 space-y-2">
        <h2 className="text-lg font-semibold">{land.name}</h2>
        <p className="text-sm text-gray-600">{land.location}</p>
        <p className="text-sm text-gray-600">Tamanho: {land.size} m²</p>
        <p className="text-sm">
          Status:{" "}
          <span
            className={`font-medium ${
              land.status === "disponível"
                ? "text-green-600"
                : land.status === "em negociação"
                ? "text-yellow-600"
                : "text-gray-500"
            }`}
          >
            {land.status}
          </span>
        </p>
      </CardContent>
    </Card>
  );
}
