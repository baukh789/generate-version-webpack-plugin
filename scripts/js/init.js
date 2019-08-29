/**
 * 初始化gridmanager脚本
 */
(function(versionTitle, versionList, versionType) {
    if (!versionTitle || !versionList || !versionType) {
        console.error('generate-version-webpack-plugin option error!');
        return;
    }

    // 绑定切换事件
	const switchShow = document.querySelector('.switch-show');
	const historyLine = document.querySelector('.history-line');
	const historyGrid = document.querySelector('.history-grid');
	switchShow.addEventListener('click', function() {
		const lineDisplay = window.getComputedStyle(historyLine).display;
		const gridDisplay = window.getComputedStyle(historyGrid).display;
		historyLine.style.display = gridDisplay;
		historyGrid.style.display = lineDisplay;
	});

	// 初始化表格
    document.querySelector('table').GM('init', {
        gridManagerName: 'generate-webpack-version-plugin',
        height: '100%',
        supportCheckbox: false,
        ajaxData: {
	        data: versionList
        },
        columnData: [
            {
                key: 'number',
                text: '版本号',
                width: '100px'
            },
            {
                key: 'date',
                text: '发布时间',
                width: '100px'
            },
            {
                key: 'list',
                text: '发布内容',
                template: (list) => {
                    let tmp = '<ul>';
                    list.forEach(item => {
                        tmp += `<li class="version-li"><label style="${versionType[item.type].style}">${versionType[item.type].text}: </label><p>${item.value}</p></li>`;
                    });
                    tmp += '</ul>';
                    return tmp
                }
            }
        ]
    });

    // 初始化流水图
	const ul = document.createElement('ul');

	// 创建更新日志名称
	const title = document.createElement('h1');
	title.innerHTML = versionTitle;
	historyLine.appendChild(title);
	let year = '';

	// 添加更新日志
	versionList.forEach(history => {
		// 更新年份
		const dateArray = history.date.split('-');
		const historyYear = dateArray[0];
		const historyDay = `${dateArray[1]}.${dateArray[2]}`;

		// 将更新年份添加到节点
		if (historyYear != year) {
			const yearLi = document.createElement('li');
			yearLi.innerHTML = `<h2>${historyYear}</h2>`;
			ul.appendChild(yearLi);
			year = historyYear;
		}

		const li = document.createElement('li');
		// 将更新时间以及更新内容添加到节点
		li.innerHTML = `<h3>${historyDay}<span>${historyYear}</span></h3>`;
		const dl = document.createElement('dl');
        const dt = document.createElement('dt');
		dt.innerHTML = `<h4>${history.number}</h4>`;

		history.list.forEach(item => {
			const p = document.createElement('p');
			p.className = 'verstion-content';
			p.innerHTML = `<label class="content-label" style="${versionType[item.type].style}">${versionType[item.type].text}: </label><span class="content-value">${item.value}</span>`;
			dt.appendChild(p);
		});
		dl.appendChild(dt);
		li.appendChild(dl);
		ul.appendChild(li);
	});

	// 将更新日志添加到页面显示
	historyLine.appendChild(ul);
})(window.versionTitle, window.versionList, window.versionType);
