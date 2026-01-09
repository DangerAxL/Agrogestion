<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLotRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('edit lots');
    }

    public function rules(): array
    {
        $lotId = $this->route('lot')->id ?? null;

        return [
            'name' => 'sometimes|required|string|max:50|unique:lots,name,'.$lotId,
            'capacity' => 'nullable|integer|min:0',
            'description' => 'nullable|string',
            'active' => 'boolean',
        ];
    }
}
