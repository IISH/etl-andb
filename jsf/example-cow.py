from cow_csvw.csvw_tool import COW
import os

path = "/Users/micons/Projects/andb_rotschild/linked-data"
filename = "ADB-2020_12_09.csv"

#COW(mode='build', files=[os.path.join(path, filename)], dataset='ANDB', delimiter=',', quotechar='\"')

COW(mode='convert', files=[os.path.join(path, filename)], dataset='ADB', delimiter=',', quotechar='\"', processes=1, chunksize=2, base='https://iisg.amsterdam/id/adb', output_format='nquads')

