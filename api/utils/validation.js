const isValidId = (id) => (id && id !== "" && !isNaN(id));

const isValidRoaster = ({ name, url, country }) => (name && name.length && url && url.length && country && country.length);

export { isValidId, isValidRoaster };
