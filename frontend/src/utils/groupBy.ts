type ObjectKey = string | number | symbol;

const groupBy = <K extends ObjectKey, TItem extends Record<K, ObjectKey>>(
  items: TItem[],
  key: K
): Record<ObjectKey, TItem[]> =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {} as Record<ObjectKey, TItem[]>
);

export default groupBy;