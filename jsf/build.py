from cow_csvw.csvw_tool import COW
import os

for file in wildcard("*.csv")
  COW(mode='build',
      files=[os.path.join(path, filename)],
      dataset='ANDB',
      delimiter=',',
      quotechar='\"')
#os.path.join(path, filename)
