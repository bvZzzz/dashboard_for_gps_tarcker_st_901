<?php

namespace Geo\DBBuilder;

trait GetErrorInfo
{
    public function getErrorCode($code)
    {
        return $code[0];
    }

    public function getErrorDriverCode($drvCode)
    {
        return $drvCode[1];
    }

    public function getErrorMessage($message)
    {
        return $message[2];
    }
}