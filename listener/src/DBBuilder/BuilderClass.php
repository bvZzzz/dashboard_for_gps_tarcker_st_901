<?php


namespace Geo\DBBuilder;


class BuilderClass
{
    public static function table(string $table)
    {
        return new DBBuilder($table);
    }
}