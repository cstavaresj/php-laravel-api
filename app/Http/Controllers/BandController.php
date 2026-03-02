<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BandController extends Controller
{
    /**
     * Retorna todas as bandas cadastradas. Permite filtrar pelo gênero (gender).
     */
    public function index(Request $request)
    {
        // Se houver "?gender=nome" na URL, filtra. Senão, retorna todas.
        $query = \App\Models\Band::query();

        if ($request->has('gender')) {
            $query->where('gender', 'like', '%' . $request->gender . '%');
        }

        return response()->json($query->get());
    }

    /**
     * Adiciona uma nova banda ao Banco de Dados.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|min:2',
            'gender' => 'required|string',
        ]);

        $band = \App\Models\Band::create([
            'name' => $request->name,
            'gender' => $request->gender,
        ]);

        return response()->json($band, 201);
    }

    /**
     * Busca uma única banda pelo ID (substitui a lógica de buscar por index do array).
     */
    public function show(string $id)
    {
        $band = \App\Models\Band::find($id);

        if (!$band) {
            return response()->json(['message' => 'Banda não encontrada'], 404);
        }

        return response()->json($band);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
