from cow_csvw.csvw_tool import COW
import glob

for file in glob.glob("*.csv"):
    COW(mode='convert', files=[file])
      #dataset='ADB',
      #delimiter=',',
      #quotechar='\"',
      #processes=1,
      #chunksize=2,
      #base='https://iisg.amsterdam/id/adb',
      #output_format='nquads')
