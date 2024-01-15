<?php
namespace Geo\Lang;

class Language
{
    const CLIENT_CONN = "new connection";
    const CLIENT_CONN_MSG = "new client was connected";
    const CLIENT_DC = "client disconnected, id:";
    const CLIENT_DC_MSG = "client was disconnected";
    const CLIENT_BANNED = "client is banned";
    const CLIENT_BANNED_MSG = "client was found in the blasklist table";
    const CONFIG_NOT_FOUND = "Config file not found";
    const SERVER_READY = "Server started";
    const SERVER_READY_MSG = "server was started";
    const RECEIVED_DATA = "Received data, id:";
    const ADD_TO_BLACKLIST = "add ip to blacklist table";
    const BAD_DATA = "client sending is bad data";
    const ERR_GETPEERNAME = "Err: the client is already disconnected, it is blacklisted";
}


?>
