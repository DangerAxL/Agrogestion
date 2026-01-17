<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAnimalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('create animals');
    }

    public function rules(): array
    {
        return [
            'caravana' => 'required|string|max:20|unique:animals,caravana',
            'breed_id' => 'required|exists:breeds,id',
            'weight_entry' => 'required|numeric|min:0',
            'weight_current' => 'required|numeric|min:0',
            'status' => 'required|string|max:50',
            'lot_id' => 'required|exists:lots,id',
            'active' => 'boolean',
            'entry_date' => 'required|date',
            'withdrawal_date' => 'nullable|date|required_if:status,sold|after:entry_date',
            'stage_name' => 'nullable|string|max:255',
            'caravana_nro' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
        ];
    }
}
