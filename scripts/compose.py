"""Original scores for Super Duper Jaydens. Requires NumPy and ffmpeg."""
from pathlib import Path
import numpy as np, wave, subprocess, json, hashlib
root=Path(__file__).resolve().parent.parent
sr=24000
rng=np.random.default_rng(124981)
scale=np.array([0,2,4,5,7,9,11])
tracks=[
 ('city-after-school',60,.625,4,48,'brass',[0,4,2,7,6,4,5,2,0,2,4,6,5,3,2,0]),
 ('skyline-sketch',65,.32,6,48,'strings',[0,4,2,6,4,2,1,5,3,6,5,3,2,4,1,0]),
 ('workshop-windows',67,.58,4,48,'guitar',[0,0,4,2,5,4,2,1,0,4,5,6,5,4,2,0]),
 ('rooftop-daybreak',62,.8,4,32,'brass',[0,0,4,6,5,4,2,1,2,4,6,7,6,5,4,2]),
 ('a-city-made-together',60,.66,4,16,'brass',[0,2,4,7,6,5,4,2,3,4,5,7,6,4,2,0])]
manifest=[]
for name,key,beat,meter,bars,voice,motif in tracks:
 length=bars*meter*beat+3
 song=np.zeros((int(length*sr),2),dtype=np.float64)
 def note(at,midi,duration,volume=.08,kind='reed',pan=0):
  n=int((duration+.35)*sr);t=np.arange(n)/sr;freq=440*2**((midi-69)/12)
  vib=np.sin(2*np.pi*4.7*t)*.0018
  phase=2*np.pi*freq*t*(1+vib)
  if kind=='bass':signal=np.sin(phase)+.22*np.sin(phase*2);envelope=(1-np.exp(-t/.015))*np.exp(-t/1.15)
  elif kind=='marimba':signal=np.sin(phase)+.32*np.sin(phase*3)*np.exp(-t*5)+.08*np.sin(phase*7);envelope=(1-np.exp(-t/.003))*np.exp(-t/ max(.12,duration*.45))
  elif kind=='brass':signal=np.sin(phase)+.36*np.sin(phase*2)+.2*np.sin(phase*3)+.08*np.sin(phase*4);envelope=(1-np.exp(-t/.09))*np.minimum(1,np.maximum(0,(duration+.2-t)/.25))
  elif kind=='guitar':signal=np.tanh((np.sin(phase)+.35*np.sin(phase*2)+.17*np.sin(phase*3)+.06*np.sin(phase*5))*.8);envelope=(1-np.exp(-t/.008))*np.exp(-t/max(.2,duration*.8))
  elif kind=='strings':signal=(np.sin(phase*.998)+np.sin(phase*1.002))*.46+.24*np.sin(phase*2)+.14*np.sin(phase*3);envelope=(1-np.exp(-t/.16))*np.minimum(1,np.maximum(0,(duration+.3-t)/.5))
  else:signal=np.sin(phase)+.22*np.sin(phase*3)+.05*np.sin(phase*5);envelope=(1-np.exp(-t/.035))*np.minimum(1,np.maximum(0,(duration+.15-t)/.2))
  sound=signal*envelope*volume;start=int(at*sr);end=min(len(song),start+n);sound=sound[:end-start]
  song[start:end,0]+=sound*(1-pan*.35);song[start:end,1]+=sound*(1+pan*.35)
 def drum(at,bright=False):
  n=int(.12*sr);t=np.arange(n)/sr;noise=rng.normal(0,1,n);noise=np.convolve(noise,np.ones(5)/5,mode='same')
  sound=noise*np.exp(-t*(55 if bright else 35))*(.014 if bright else .025)
  start=int(at*sr);song[start:start+n,0]+=sound;song[start:start+n,1]+=sound
 def pitch(degree,octave=0):return key+int(scale[degree%7])+12*(degree//7+octave)
 roots=[0,5,1,4,0,3,1,4]
 for bar in range(bars):
  start=bar*meter*beat;degree=roots[bar%len(roots)];chord=[pitch(degree),pitch(degree+2),pitch(degree+4)]
  # A clear structure: main tune, quieter middle, then varied return.
  section=bar//8;leadvol=.075 if section%3!=1 else .045
  for j,m in enumerate(chord):note(start+.035*j,m-12,meter*beat*.86,.018,'strings',(-.7,0,.7)[j])
  if meter==6:
   for b in [0,3]:note(start+b*beat,pitch(degree,-2),beat*2.4,.065,'bass',-.3)
   for b in [1,2,4,5]:note(start+b*beat,chord[b%3],beat*.65,.033,'marimba',.4)
   positions=[0,2,3,5];durations=[1.7,.7,1.7,.7]
  elif voice=='guitar':
   for b in [0,1.5,3]:note(start+b*beat,pitch(degree,-2),beat*.7,.062,'bass',-.35)
   for b in [0.5,2,3.5]:note(start+b*beat,chord[int(b)%3],beat*.45,.036,'guitar',.45)
   positions=[0,.75,1.5,2.5,3.25];durations=[.6,.6,.8,.6,.5]
  elif voice=='brass':
   for b in [0,2]:note(start+b*beat,pitch(degree,-2),beat*1.5,.065,'bass',-.3)
   positions=[0,1.5,3];durations=[1.3,1.3,.75]
  else:
   for b in range(4):note(start+b*beat,pitch(degree+(0,2,4,1)[b],-2),beat*.75,.057,'bass',-.3)
   positions=[0,.67,1.67,2.67];durations=[.55,.7,.7,1.05]
  for j,b in enumerate(positions):
   d=motif[(bar*len(positions)+j)%len(motif)]
   if section%3==1:d=(d+2)%7
   if bar%8 in [6,7]:d=[4,2,1,0][j%4]
   note(start+b*beat,pitch(d,1 if voice=='marimba' else 0),durations[j]*beat,leadvol,voice,.15)
  if voice=='brass' and bar>7:
   for pulse in [0,1,2,3]:note(start+pulse*beat,pitch(degree+(pulse%2)*2),beat*.43,.023,'strings',-.45)
  if bar>3:
   for b in ([0,3] if meter==6 else [1,3]):drum(start+b*beat)
   if voice!='strings':
    for b in range(meter):drum(start+(b+.5)*beat,True)
 # Resolve the final phrase and leave space rather than cut off a sustained note.
 final=(bars-1)*meter*beat
 note(final+meter*beat*.5,key,meter*beat*.5,.07,voice)
 fade=np.minimum(1,np.arange(len(song))/int(sr*1.4))*np.minimum(1,np.maximum(0,(len(song)-np.arange(len(song)))/int(sr*2.5)))
 song*=fade[:,None]
 peak=np.max(np.abs(song));song*=min(1,.78/max(peak,.01))
 pcm=(np.clip(song,-.99,.99)*32767).astype('<i2')
 wav=Path('/private/tmp')/(name+'.wav')
 with wave.open(str(wav),'wb') as f:f.setnchannels(2);f.setsampwidth(2);f.setframerate(sr);f.writeframes(pcm.tobytes())
 out=root/'assets/audio'/(name+'.mp3')
 subprocess.run(['/opt/homebrew/opt/ffmpeg-full/bin/ffmpeg','-y','-loglevel','error','-i',str(wav),'-af','loudnorm=I=-20:TP=-2:LRA=9','-codec:a','libmp3lame','-b:a','112k',str(out)],check=True)
 manifest.append({'file':'assets/audio/'+out.name,'duration':round(length,2),'lead':voice,'meter':meter,'bpm':round(60/beat,2),'mix':'Revised cinematic orchestral/electric palette; loudness normalized to -20 LUFS target and -2 dBTP ceiling.','origin':'Original score and synthesized recording created for Super Duper Jaydens. No samples or pre-existing melodies.','sha256':hashlib.sha256(out.read_bytes()).hexdigest()})
 print(name,round(length),flush=True)
(root/'assets/audio/manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
