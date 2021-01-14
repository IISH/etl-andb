from cow_csvw.csvw_tool import COW
import glob

for file in glob.glob("*.csv"):
    COW(mode='convert', files=[file])
