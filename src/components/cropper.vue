<template>
    <div>
        场景:一张图片经过后台解析，将所需位置的坐标与宽高返回，并由前台标注出来了，对象为slice, 而后需选择在另一个位置展示选择的部分
        1、canvas实例（canvasObj）通过<span>drawImage</span>读取整个图片,但是要在img加载完成后（如：getSrcOriginSize）执行
            -const imgDom = this.$refs.cardImg
            -this.canvas.drawImage(imgDom, 0, 0, w, h)
        2、canvas实例（canvasObj）调用<span>getImageData</span>方法，根据截取位置和截取部分的宽，高获取截取部分图片的数据
            const imgData = this.canvas.getImageData(
                slice.x / this.scaleRate,
                slice.y / this.scaleRate,
                slice.w / this.scaleRate,
                slice.h / this.scaleRate
            )
        3、创建一个canvas，通过调用<span>putImageData</span>放置第2步中获取的部分图片的数据，再通过<span>toDataURL</span>，转换成url
            const sliceCanvas = document.createElement('canvas')
            sliceCanvas.width = imgData.width
            sliceCanvas.height = imgData.height
            sliceCanvas.getContext('2d').putImageData(imgData, 0, 0)
            sliceCanvas.toDataURL('image/png')

        ** drawImage和putImageData方法的参数1的类型不同

        场景二：新增slice，点击图片的相关位置用预设的大小获取slice的位置
        const rect = {
            isActive: false,
            isShow: true,
            selected: false,
            w: this.sliceWidth / pageScale,
            h: this.sliceWidth / pageScale,
            x: e.layerX || e.offsetX,
            y: e.layerY || e.offsetY
        }

        场景三：框选，获取位置，传给后台，后台实现截图，返回所截图片地址，前台展示
            -框选时的框，用div显示，实时获取div的起点x，y及w，h
            -代码见智慧技术项目：
            src\views\doc-examination\current-case\stamp\stamp-matching\NoDataCheckbox.vue（515行起）

        场景四：框选，前台获取截图，上传所截图片，后台保存，返回图片地址，前台展示
            
    </div>
</template>

<script>
    export default {
        methods: {
            getSrcOriginSize(callback) {
                const img = new Image()
                img.src = `${this.imgSrc}`
                // 如果图片被缓存，则直接返回缓存数据
                if (img.complete) {
                    callback(img.width, img.height)
                } else {
                    // 完全加载完毕的事件
                    img.onload = function() {
                    callback(img.width, img.height)
                    }
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>