import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

@Injectable()
export class AppService {
  async translateToJson(javaCode: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', ['translateToJson.py']);

      let pythonOutput = '';

      pythonProcess.stdout.on('data', (data) => {
        pythonOutput += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python process: ${data}`);
        reject(data.toString());
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          resolve(pythonOutput);
        } else {
          console.error(`Python process exited with code ${code}`);
          reject(`Python process exited with code ${code}`);
        }
      });

      pythonProcess.stdin.write(javaCode);
      pythonProcess.stdin.end();
    });
  }

  translateRepositoryToJSON() {
    return '{"name": "git_repo"}';
  }

  getDatasets() {
    return 'datasets';
  }

  designPrompt(actualJsonData: string, hidingInfo: object): Promise<string> {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', ['designPrompt.py']);
      let pythonOutput = '';
      pythonProcess.stdout.on('data', (data) => {
        pythonOutput += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python process: ${data}`);
        reject(data.toString());
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          resolve(pythonOutput);
        } else {
          console.error(`Python process exited with code ${code}`);
          reject(`Python process exited with code ${code}`);
        }
      });

      const requestData = {
        actualJsonData,
        hidingInfo,
      };

      const requestDataString = JSON.stringify(requestData);
      pythonProcess.stdin.write(requestDataString);
      pythonProcess.stdin.end();
    });
  }

  reconstructSoftwareArtifacts(
    incompleteJsonData: string,
    prompt: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', [
        'reconstructSoftwareArtifacts.py',
      ]);
      let pythonOutput = '';
      pythonProcess.stdout.on('data', (data) => {
        pythonOutput += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Error from Python process: ${data}`);
        reject(data.toString());
      });

      pythonProcess.on('close', (code) => {
        if (code === 0) {
          resolve(pythonOutput);
        } else {
          console.error(`Python process exited with code ${code}`);
          reject(`Python process exited with code ${code}`);
        }
      });

      const requestData = {
        incompleteJsonData,
        prompt,
      };

      const requestDataString = JSON.stringify(requestData);
      pythonProcess.stdin.write(requestDataString);
      pythonProcess.stdin.end();
    });
  }

  getInfo() {
    return 'info';
  }

  getAnalytics() {
    return 'analytics';
  }

  getAbout() {
    return 'about';
  }
}
