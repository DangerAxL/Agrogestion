<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFeedTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('edit feed-types');
    }

    public function rules(): array
    {
        $feedTypeId = $this->route('feed_type')->id ?? null;

        return [
            'name' => 'sometimes|required|string|max:100|unique:feed_types,name,'.$feedTypeId,
            'composition' => 'nullable|string',
        ];
    }
}
