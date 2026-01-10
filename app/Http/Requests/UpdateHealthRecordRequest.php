<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateHealthRecordRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('edit health records');
    }

    public function rules(): array
    {
        return [
            'animal_id' => 'sometimes|required|exists:animals,id',
            'type' => 'sometimes|required|string|max:100',
            'description' => 'nullable|string',
            'date' => 'sometimes|required|date',
            'veterinarian_id' => 'sometimes|required|exists:users,id',
            'cost' => 'nullable|numeric|min:0',
            'withdrawal_days' => 'nullable|integer|min:0',
            'release_date' => 'nullable|date|after:date',
            'observations' => 'nullable|string',
        ];
    }
}
