import {
  FilterBuilder,
  FilterOperationType,
} from "@chax-at/prisma-filter-common";
import { User } from "@prisma/client";
(async () => {
  const filterBuilder = new FilterBuilder<User>() // create a new filter builder for User entities..
    .addFilter("name", FilterOperationType.Ilike, "%Max%") // ...filter by name ilike '%Max%'
    .addOrderBy("name", "asc") // ...order by name, asc
    .setPageSize(40) // ...paginate with a pagesize of 40
    .requestPage(3); // ...return the third page
  // const filter = filterBuilder.toFilter(); // get the resulting IFilter<User>
  const queryString = filterBuilder.toQueryString(); // get the resulting query string (as described below)

  console.log(queryString);

  // Note that you can also re-use the same filter if you just want to request a different page without changing filter or ordering:
  // const firstPageFilter = filterBuilder.requestPage(1).toFilter();
  process.exit(0);
})();
