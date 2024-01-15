export function useCoordsPosition() {
    function setCoordsPosition(coords) {
        if (coords.length > 0){
            localStorage.setItem('lat', coords[0]);
            localStorage.setItem('long', coords[1]);
        }
    }

    function clearCoordsPosition() {
        localStorage.removeItem('lat');
        localStorage.removeItem('long');
    }

    return { setCoordsPosition, clearCoordsPosition }
}
