const default_options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: true,
};

const date_only_options = {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour12: false,
};


export const formatDateTime = (date, options=default_options) => {
  return (
    new Intl.DateTimeFormat("en-US", options).format(new Date(date))
  )
};

export const formatDate = (date) => {
  return formatDateTime(date, date_only_options)
};
