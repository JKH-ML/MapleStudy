# 코랩에 코드 복사하기
# gemini 탭 열고 프롬프트에 다음과 같이 입력
# "이 코드에 기반하여 이미지를 저장해서 zip파일로 압축해서 
# 내 컴퓨터에 저장하는 코드로 수정해줘"

import requests
from bs4 import BeautifulSoup
import os
from urllib.parse import urljoin

def download_inven_images(url, save_dir='maple_images'):
    # 저장할 디렉토리 생성
    if not os.path.exists(save_dir):
        os.makedirs(save_dir)
    
    # 웹페이지 가져오기
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    response = requests.get(url, headers=headers)
    response.raise_for_status()  # 오류 발생시 예외 발생
    
    # BeautifulSoup으로 HTML 파싱
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # 게시글 본문 내 이미지 찾기
    content_area = soup.find('div', class_='contentBody')
    if content_area:
        images = content_area.find_all('img')
        
        for idx, img in enumerate(images):
            img_url = img.get('src')
            if img_url:
                # 상대 URL을 절대 URL로 변환
                if not img_url.startswith(('http://', 'https://')):
                    img_url = urljoin(url, img_url)
                
                try:
                    # 이미지 다운로드
                    img_response = requests.get(img_url, headers=headers)
                    img_response.raise_for_status()
                    
                    # 파일 확장자 추출
                    extension = img_url.split('.')[-1].split('?')[0]
                    if extension not in ['jpg', 'jpeg', 'png', 'gif']:
                        extension = 'jpg'
                    
                    # 이미지 저장
                    file_name = f'maple_image_{idx + 1}.{extension}'
                    file_path = os.path.join(save_dir, file_name)
                    
                    with open(file_path, 'wb') as f:
                        f.write(img_response.content)
                    
                    print(f'Downloaded: {file_name}')
                    
                except Exception as e:
                    print(f'Error downloading image {idx + 1}: {str(e)}')
    
    print('Download completed!')

# 사용 예시
url = 'https://www.inven.co.kr/board/maple/2447/4071'
download_inven_images(url)
