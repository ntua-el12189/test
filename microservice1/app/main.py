from fastapi import FastAPI, Request, UploadFile, HTTPException, status
from fastapi.responses import HTMLResponse
import aiofiles
import pandas as pd
from matplotlib import pyplot as plt
import csv



app = FastAPI()

import pandas as pd
from matplotlib import pyplot as plt

@app.get("/showlinechart")
def read_root():
    plt.rcParams["figure.figsize"] = [7.00, 3.50]
    plt.rcParams["figure.autolayout"] = True
    columns = ["Name", "Age"]
    df = pd.read_csv("input.csv", usecols=columns)
    print("Contents in csv file:", df)
    plt.plot(df.Name, df.Age)
    plt.show()
    return {"message": "Welcome to the FastAPI Microservice!"}

@app.get("/showcontents")
def read_root():
    
    df = pd.read_csv("input.csv")
    
    return {"message": df.to_string()}

@app.post('/upload')
async def upload(file: UploadFile):
    try:
        contents = await file.read()
        async with aiofiles.open(file.filename, 'wb') as f:
            await f.write(contents)
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='There was an error uploading the file',
        )
    finally:
        await file.close()

    return {'message': f'Successfuly uploaded {file.filename}'}
        
# Access the form at 'http://127.0.0.1:8000/' from your browser
@app.get('/')
async def main():
    content = '''
    <body>
    <form action='/upload' enctype='multipart/form-data' method='post'>
    <input name='file' type='file'>
    <input type='submit'>
    </form>
    <form action='/showcontents' method='get'>
    
    <input type='submit' value="show contents of csv file"> <br />
    </form>
     <form action='/showlinechart' method='get'>
    
    <input type='submit' value="show line chart"> <br />
    </form>
    </body>
    '''
    return HTMLResponse(content=content)