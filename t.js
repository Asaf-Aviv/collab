const state = {
  name: 'hi',
  extra_details: {
    uk_company_type: '',
    uk_company_number: 123,
  },
}

const x = {
  name: state.name,
  ...Object.fromEntries(Object.entries(state).filter(([, val]) => val)),
}

console.log(x)
