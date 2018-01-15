export function secondsToTime(seconds: number) {
    var hours = seconds / 3600 % 24;
    var minutes = seconds / 60 % 60;
    var seconds = seconds % 60;

    return {
        seconds,
        minutes,
        hours
    };
};

export function futch(url: string, opts: any = {}, onProgress: any) {
    return new Promise((res, rej) => {
        var xhr = new XMLHttpRequest();
        xhr.open(opts.method || 'get', url);
        for (var k in opts.headers || {})
            xhr.setRequestHeader(k, opts.headers[k]);
        xhr.onload = (e: any) => res(e.target.responseText as string);
        xhr.onerror = rej;
        if (xhr.upload && onProgress)
            xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
        xhr.send(opts.body);
    });
}
