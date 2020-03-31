export const fetchData = () => async dispatch => {
  dispatch(fetchDataRequest())
  try {
    const { data } = await axios.get('api')
    const columns = data.columnHeaders.map(col => ({
      title: col,
      dataIndex: col,
      key: col,
    }))

    const rows = data.results.map((res, i) => ({
      key: i,
      ...columns.reduce(
        (acc, cur, i) => ({
          ...acc,
          [cur.dataIndex]: res[i],
        }),
        {},
      ),
    }))

    dispatch(fetchDataSuccess(rows, columns))
  } catch (error) {
    dispatch(fetchDataFail(error.message))
  }
}
