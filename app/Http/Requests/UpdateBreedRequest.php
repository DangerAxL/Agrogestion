<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBreedRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('edit breeds');
    }

    public function rules(): array
    {
        $breedId = $this->route('breed')->id ?? null;

        return [
            'name' => 'sometimes|required|string|max:50|unique:breeds,name,'.$breedId,
        ];
    }
}
