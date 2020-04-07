/* eslint-disable camelcase */

module.exports = () => [
    { name: "imt_power",
        template: `
        
libname cat_lib META LIBRARY=#{1};

PROC SQL;
CREATE TABLE WORK.QUERY_FOR_IMT AS
SELECT t1.dma,
    t1.ppweek,
    (SUM(t1.totalvalue)) AS dollars,
    (SUM(t1.proj_totalvalue)) AS proj_dollars
FROM cat_lib.#{2} t1
WHERE t1.upc_code IN
(#{3})

GROUP BY t1.dma,
    t1.ppweek;
QUIT;

proc export data=WORK.QUERY_FOR_IMT dbms=csv
outfile=/sasfiles/aa/amueller/imt/data
replace;
run;
`
    }
];


//HOUPosProdStoreLevWeeklySDA