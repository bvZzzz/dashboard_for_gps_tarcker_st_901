<?php

namespace Geo\DBBuilder;

interface SQLQueryBuilder
{
    public function select(string $fields): SQLQueryBuilder;

    public function insert(array $fields): SQLQueryBuilder;

    public function update(array $fields): SQLQueryBuilder;

    public function delete(): SQLQueryBuilder;

    public function truncate(): SQLQueryBuilder;

    public function where(string $field, string $value, string $operator = '='): SQLQueryBuilder;

    public function like(string $field, string $value): SQLQueryBuilder;

    public function limit(int $start, int $offset = 0): SQLQueryBuilder;

    public function groupBy(string $value): SQLQueryBuilder;

    public function orderBy(string $filed, string $mode = 'ASC'): SQLQueryBuilder;

    public function find($id);

    public function count(string $filed, string $as = '');

    public function debug(): SQLQueryBuilder;

    public function get();

    public function getAll();

    public function set();
}