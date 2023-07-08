from fastapi import FastAPI, Request, UploadFile, HTTPException, status
from fastapi.responses import HTMLResponse
import aiofiles
import pandas as pd
from matplotlib import pyplot as plt
import csv



app = FastAPI()

import pandas as pd
from matplotlib import pyplot as plt

@app.get('/showbarchart')
def read_root():
    columns = ["Name", "Age"]
    df = pd.read_csv("input.csv", usecols=columns)
    
  
    x = df.Name
    y = df.Age
      
    # Plot the data using bar() method
    plt.bar(x, y, color = 'g', width = 0.72, label = "Age")
    plt.xlabel('Names')
    plt.ylabel('Ages')
    plt.title('Bar Chart')
    plt.legend()
    plt.show()
    return {"message": "Welcome to the FastAPI Microservice!"}

@app.get('/showcontents')
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
     <form action='/showbarchart' method='get'>
    
    <input type='submit' value="show bar chart"> <br />
    </form>
    </body>
    '''
    return HTMLResponse(content=content)