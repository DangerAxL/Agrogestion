<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAnimalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('edit animals');
    }

    public function rules(): array
    {
        $animalId = $this->route('animal')->id ?? null;

        return [
            'caravana' => 'sometimes|required|string|max:20|unique:animals,caravana,' . $animalId,
            'breed_id' => 'sometimes|required|exists:breeds,id',
            'weight_entry' => 'sometimes|required|numeric|min:0',
            'weight_current' => 'sometimes|required|numeric|min:0',
            'status' => 'sometimes|required|string|max:50',
            'lot_id' => 'sometimes|required|exists:lots,id',
            'active' => 'boolean',
            'entry_date' => 'sometimes|required|date',
            'withdrawal_date' => 'nullable|date|required_if:status,sold|after:entry_date',
            'stage_name' => 'nullable|string|max:255',
            'caravana_nro' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
        ];
    }
}
