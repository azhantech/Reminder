function getNextMonday(date = new Date()) {
    const dateCopy = new Date(date.getTime());
    const nextMonday = new Date(
        dateCopy.setDate(
            dateCopy.getDate() + ((7 - dateCopy.getDay() + 1) % 7 || 7),
        ),
    );
    return nextMonday;
}

function getNextTuesday(date = new Date()) {
    const dateCopy = new Date(date.getTime());
    const nextTuesday = new Date(
        dateCopy.setDate(
            dateCopy.getDate() + ((7 - dateCopy.getDay() + 2) % 7 || 7),
        ),
    );
    return nextTuesday;
}

function getNextWednesday(date = new Date()) {
    const dateCopy = new Date(date.getTime());
    const nextWednesday = new Date(
        dateCopy.setDate(
            dateCopy.getDate() + ((7 - dateCopy.getDay() + 3) % 7 || 7),
        ),
    );
    return nextWednesday;
}

function getNextThursday(date = new Date()) {
    const dateCopy = new Date(date.getTime());
    const nextThursday = new Date(
        dateCopy.setDate(
            dateCopy.getDate() + ((7 - dateCopy.getDay() + 4) % 7 || 7),
        ),
    );
    return nextThursday;
}

function getNextFriday(date = new Date()) {
    const dateCopy = new Date(date.getTime());
    const nextFriday = new Date(
        dateCopy.setDate(
            dateCopy.getDate() + ((7 - dateCopy.getDay() + 5) % 7 || 7),
        ),
    );
    return nextFriday;
}

function getNextSaturday(date = new Date()) {
    const dateCopy = new Date(date.getTime());
    const nextSaturday = new Date(
        dateCopy.setDate(
            dateCopy.getDate() + ((7 - dateCopy.getDay() + 6) % 7 || 7),
        ),
    );
    return nextSaturday;
}

function getNextSunday(date = new Date()) {
    const dateCopy = new Date(date.getTime());
    const nextSunday = new Date(
        dateCopy.setDate(
            dateCopy.getDate() + ((7 - dateCopy.getDay() + 6) % 7 || 7),
        ),
    );
    return nextSunday;
}


export const nextMondayComing = getNextMonday(new Date())
export const nextTuesdayComing = getNextTuesday(new Date())
export const nextWednesdayComing = getNextWednesday(new Date())
export const nextThursdayComing = getNextThursday(new Date())
export const nextFridayComing = getNextFriday(new Date())
export const nextSaturdayComing = getNextSaturday(new Date())
export const nextSundayComing = getNextSunday(new Date())


