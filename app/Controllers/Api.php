<?php

namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Api extends ResourceController
{
    public function submitForm()
{
    $data = $this->request->getJSON(true); // get as associative array

    if (!$data || !is_array($data)) {
        return $this->respond([
            'status' => 'error',
            'message' => 'Invalid input data'
        ], 400);
    }

    foreach ($data as $row) {
        if (
            empty($row['name']) ||
            empty($row['email']) ||
            empty($row['mobile']) ||
            empty($row['gender'])
        ) {
            return $this->respond([
                'status' => 'error',
                'message' => 'All fields are required.'
            ], 400);
        }

        if (!filter_var($row['email'], FILTER_VALIDATE_EMAIL)) {
            return $this->respond([
                'status' => 'error',
                'message' => 'Invalid email format.'
            ], 400);
        }

        if (!preg_match('/^\d{10}$/', $row['mobile'])) {
            return $this->respond([
                'status' => 'error',
                'message' => 'Mobile must be 10 digits.'
            ], 400);
        }
    }

    return $this->respond([
        'status' => 'success',
        'message' => 'Form submitted successfully'
    ]);
}

}
