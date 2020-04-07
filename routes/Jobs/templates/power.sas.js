module.exports = (library, fact_table, dma_table, upc_list, job_id) => `

libname cat_lib META LIBRARY=${library};

PROC SQL;
CREATE TABLE WORK.QUERY_FOR_IMT1 AS
SELECT t2.dma_name as dma,
    t1.ppweek,
    (SUM(t1.totalvalue)) AS dollars,
    (SUM(t1.proj_totalvalue)) AS proj_dollars
FROM cat_lib.${fact_table} t1
    INNER JOIN HOUSWP.vw_houmktsaw_dma_lu t2 ON (t1.dma = t2.dma)
WHERE t1.upc_code IN
(${upc_list})

GROUP BY t1.dma,
    t1.ppweek;

PROC SQL;
   CREATE TABLE WORK.QUERY_FOR_IMT2 AS 
   SELECT t1.outlet, 
          t1.storeid, 
          t2.dma_name as dma, 
          t1.ppweek, 
          /* SUM_of_totalvalue */
            (SUM(t1.totalvalue)) AS dollars, 
          /* SUM_of_proj_totalvalue */
            (SUM(t1.proj_totalvalue)) AS proj_dollars
      FROM cat_lib.${fact_table} t1
        INNER JOIN cat_lib.${dma_table} t2 ON (t1.dma = t2.dma)
      WHERE t1.upc_code IN 
           (${upc_list})
      GROUP BY t1.outlet,
               t1.storeid,
               t1.dma,
               t1.ppweek;
QUIT;


proc export data=WORK.QUERY_FOR_IMT1 dbms=csv
outfile='/sasfiles/aa/amueller/imt/${job_id}/dma.csv'
replace;
run;

proc export data=WORK.QUERY_FOR_IMT2 dbms=csv
outfile='/sasfiles/aa/amueller/imt/${job_id}/store.csv'
replace;
run;

`