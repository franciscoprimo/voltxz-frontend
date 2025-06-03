/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/dashboard/owner/lands/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { landService, Land, CreateLandDto } from '@/services/landService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription // Importe este também
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input as ShadcnInput } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function MyLandsPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const [myLands, setMyLands] = useState<Land[]>([]);
  const [loadingLands, setLoadingLands] = useState(true);
  const [errorLands, setErrorLands] = useState('');

  // Estados para o formulário de novo terreno
  const [newLandData, setNewLandData] = useState<CreateLandDto>({
    price: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
  });
  const [isNewLandModalOpen, setIsNewLandModalOpen] = useState(false); // Renomeado para clareza

  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');

  // --- Novos estados para o Modal de Detalhes ---
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedLandDetails, setSelectedLandDetails] = useState<Land | null>(null);
  const [loadingLandDetails, setLoadingLandDetails] = useState(false);
  const [errorLandDetails, setErrorLandDetails] = useState('');
  // --- Fim dos novos estados ---


  useEffect(() => {
    document.title = 'VoltzX | Meus Terrenos';
    if (!isLoading && (!isAuthenticated || user?.user_type !== 'land_owner')) {
      router.push('/signin');
    } else if (isAuthenticated && user?.user_type === 'land_owner') {
      fetchMyLands();
    }
  }, [isAuthenticated, isLoading, user, router]);

  const fetchMyLands = async () => {
    setLoadingLands(true);
    setErrorLands('');
    try {
      const lands = await landService.getMyLands();
      setMyLands(lands);
    } catch (err: any) {
      setErrorLands(err.message || 'Erro ao carregar seus terrenos.');
    } finally {
      setLoadingLands(false);
    }
  };

  const handleCreateLand = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    try {
      if (!newLandData.price || !newLandData.street || !newLandData.number ||
          !newLandData.city || !newLandData.state || !newLandData.postal_code ||
          !newLandData.country) {
        setFormError('Por favor, preencha todos os campos obrigatórios.');
        setFormLoading(false);
        return;
      }

      const dataToSend: CreateLandDto = {
        price: newLandData.price,
        street: newLandData.street,
        number: newLandData.number,
        city: newLandData.city,
        state: newLandData.state,
        postal_code: newLandData.postal_code,
        country: newLandData.country,
      };
      if (newLandData.complement) dataToSend.complement = newLandData.complement;
      if (newLandData.district) dataToSend.district = newLandData.district;

      const createdLand = await landService.createLand(dataToSend);
      setMyLands((prevLands) => [...prevLands, createdLand]);
      setNewLandData({
        price: '', street: '', number: '', complement: '', district: '',
        city: '', state: '', postal_code: '', country: '',
      });
      setIsNewLandModalOpen(false); // Usar o novo estado
      alert('Terreno cadastrado com sucesso!');
    } catch (err: any) {
      setFormError(err.message || 'Erro ao cadastrar terreno.');
    } finally {
      setFormLoading(false);
    }
  };

  // --- Nova função para buscar e exibir detalhes do terreno ---
  const handleViewDetails = async (landId: string) => {
    setLoadingLandDetails(true);
    setErrorLandDetails('');
    setSelectedLandDetails(null);
    setIsDetailsModalOpen(true); // Abre o modal antes de buscar para mostrar o "Carregando..."
    try {
      const land = await landService.getLandById(landId); // Assumindo que você tem um método getLandById
      setSelectedLandDetails(land);
    } catch (err: any) {
      setErrorLandDetails(err.message || 'Erro ao carregar detalhes do terreno.');
      setSelectedLandDetails(null); // Limpa os detalhes se houver erro
    } finally {
      setLoadingLandDetails(false);
    }
  };
  // --- Fim da nova função ---


  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!isAuthenticated || user?.user_type !== 'land_owner') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <nav className="bg-white shadow-md py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <a href="/dashboard/owner" className="font-bold text-xl text-yellow-700">
            VoltzX
          </a>
          <button
            className="md:hidden border-0 focus:outline-none"
            type="button"
            aria-label="Toggle navigation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
            </svg>
          </button>
          <div className="hidden md:flex items-center space-x-4">
            <a href="/dashboard/owner" className="text-gray-700 hover:text-gray-900">Home</a>
            <div className="relative flex items-center">
              <ShadcnInput
                type="search"
                placeholder="Buscar terrenos..."
                className="pr-10 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
              />
              <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => router.push('/signout')}>
              Sair
            </Button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar (Left Column) */}
        <div className="md:col-span-2">
          <div className="bg-white shadow-md rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-gray-700 mb-2">Ações</h3>
            <Dialog open={isNewLandModalOpen} onOpenChange={setIsNewLandModalOpen}>
              <DialogTrigger asChild>
                <Button className="w-full justify-start">Cadastrar Novo Terreno</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Cadastrar Novo Terreno</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleCreateLand} className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="street" className="text-right">Rua</Label>
                    <Input id="street" value={newLandData.street} onChange={(e) => setNewLandData({ ...newLandData, street: e.target.value })} required className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="number" className="text-right">Número</Label>
                    <Input id="number" value={newLandData.number} onChange={(e) => setNewLandData({ ...newLandData, number: e.target.value })} required className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="complement" className="text-right">Complemento</Label>
                    <Input id="complement" value={newLandData.complement || ''} onChange={(e) => setNewLandData({ ...newLandData, complement: e.target.value })} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="district" className="text-right">Bairro</Label>
                    <Input id="district" value={newLandData.district || ''} onChange={(e) => setNewLandData({ ...newLandData, district: e.target.value })} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="city" className="text-right">Cidade</Label>
                    <Input id="city" value={newLandData.city} onChange={(e) => setNewLandData({ ...newLandData, city: e.target.value })} required className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="state" className="text-right">Estado</Label>
                    <Input id="state" value={newLandData.state} onChange={(e) => setNewLandData({ ...newLandData, state: e.target.value })} required className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="postal_code" className="text-right">CEP</Label>
                    <Input id="postal_code" value={newLandData.postal_code} onChange={(e) => setNewLandData({ ...newLandData, postal_code: e.target.value })} required className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="country" className="text-right">País</Label>
                    <Input id="country" value={newLandData.country} onChange={(e) => setNewLandData({ ...newLandData, country: e.target.value })} required className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">Preço (R$)</Label>
                    <Input id="price" type="text" value={newLandData.price} onChange={(e) => setNewLandData({ ...newLandData, price: e.target.value })} required className="col-span-3" />
                  </div>
                  {formError && <p className="text-red-500 text-center col-span-4">{formError}</p>}
                  <DialogFooter className="col-span-4">
                    <Button type="submit" disabled={formLoading} className="bg-yellow-500 hover:bg-yellow-600">
                      {formLoading ? 'Cadastrando...' : 'Cadastrar Terreno'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
            {/* Adicione outros links de sidebar aqui */}
          </div>
        </div>

        {/* Main Content (Right Column) */}
        <div className="md:col-span-10 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Seus Terrenos Cadastrados</h2>
          {loadingLands ? (
            <p>Carregando terrenos...</p>
          ) : errorLands ? (
            <p className="text-red-500">{errorLands}</p>
          ) : myLands.length === 0 ? (
            <p>Você ainda não tem terrenos cadastrados. Cadastre um novo!</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableCaption>Lista dos seus terrenos cadastrados.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Rua</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Preço</TableHead>
                    <TableHead>Disponibilidade</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myLands.map((land) => (
                    <TableRow key={land.id}>
                      <TableCell>{land.id}</TableCell>
                      <TableCell>{land.street}</TableCell>
                      <TableCell>{land.number}</TableCell>
                      <TableCell>{land.city}</TableCell>
                      <TableCell>{land.state}</TableCell>
                      <TableCell>R$ {parseFloat(land.price).toFixed(2)}</TableCell>
                      <TableCell>{land.availability ? 'Sim' : 'Não'}</TableCell>
                      <TableCell className="text-right">
                        {/* Modificação aqui para abrir o modal */}
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleViewDetails(land.id)} // Chama a nova função
                          className="mr-2"
                        >
                          Ver Detalhes
                        </Button>
                        <Button variant="outline" size="sm" className="mr-2">
                          Editar
                        </Button>
                        <Button variant="destructive" size="sm">
                          Excluir
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>

      {/* --- Novo Modal de Detalhes do Terreno --- */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Terreno</DialogTitle>
            <DialogDescription>
              Informações completas sobre o terreno selecionado.
            </DialogDescription>
          </DialogHeader>
          {loadingLandDetails ? (
            <div className="flex items-center justify-center py-4">Carregando detalhes...</div>
          ) : errorLandDetails ? (
            <p className="text-red-500 text-center py-4">{errorLandDetails}</p>
          ) : selectedLandDetails ? (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">ID:</span>
                <span>{selectedLandDetails.id}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">Rua:</span>
                <span>{selectedLandDetails.street}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">Número:</span>
                <span>{selectedLandDetails.number}</span>
              </div>
              {selectedLandDetails.complement && (
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-semibold">Complemento:</span>
                  <span>{selectedLandDetails.complement}</span>
                </div>
              )}
              {selectedLandDetails.district && (
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-semibold">Bairro:</span>
                  <span>{selectedLandDetails.district}</span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">Cidade:</span>
                <span>{selectedLandDetails.city}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">Estado:</span>
                <span>{selectedLandDetails.state}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">CEP:</span>
                <span>{selectedLandDetails.postal_code}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">País:</span>
                <span>{selectedLandDetails.country}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">Preço:</span>
                <span>R$ {parseFloat(selectedLandDetails.price).toFixed(2)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <span className="font-semibold">Disponibilidade:</span>
                <span>{selectedLandDetails.availability ? 'Sim' : 'Não'}</span>
              </div>
              {/* Você pode adicionar mais campos aqui se seu objeto Land tiver mais propriedades */}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-4">Nenhum detalhe disponível.</p>
          )}
          <DialogFooter>
            <Button onClick={() => setIsDetailsModalOpen(false)}>Fechar</Button>
            {/* Opcional: Botão de Edição aqui, se fizer sentido ter um "Editar Detalhes" direto do modal */}
            {selectedLandDetails && (
              <Button
                variant="outline"
                onClick={() => {
                  // Lógica para abrir o modal de edição com os dados de selectedLandDetails
                  setIsDetailsModalOpen(false); // Fecha o modal de detalhes
                  // setIsEditModalOpen(true); // Abre o modal de edição (será implementado depois)
                  // setEditLandData(selectedLandDetails); // Popula o formulário de edição
                  alert('Funcionalidade de edição será implementada aqui!');
                }}
              >
                Editar
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* --- Fim do Novo Modal de Detalhes do Terreno --- */}

    </div>
  );
}