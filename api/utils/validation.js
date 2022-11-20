const isValidId = (id) => (id && id !== "" && !isNaN(id));

const isValidRoaster = ({ name, url, country }) => (name && name.length && url && url.length && country && country.length);

const isValidCoffee = ({ name, roasterId, url, roastType, bestFor, origin, country }) => {
    return (
        name && name.length
        && isValidId(roasterId)
        && url && url.length
        && (!roastType || ["dark", "medium", "light"].includes(roastType))
        && (!bestFor || ["espresso", "filter"].includes(bestFor))
        && ["blend", "single origin"].includes(origin)
        && country && country.length
    );
};

export { isValidId, isValidRoaster, isValidCoffee };
