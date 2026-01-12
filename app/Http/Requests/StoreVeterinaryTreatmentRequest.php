<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVeterinaryTreatmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'treatment_catalog_id' => 'required|exists:treatment_catalogs,id',
            'animal_id' => 'required|exists:animals,id',
            'applied_at' => 'required|date',
            'dosage' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ];
    }
}
